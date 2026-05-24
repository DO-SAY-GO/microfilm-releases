#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$SCRIPT_DIR"
PROJECT_NAME="${CF_PAGES_PROJECT_NAME:-microfilm-releases}"
PRODUCTION_BRANCH="${CF_PAGES_PRODUCTION_BRANCH:-main}"
PUBLISH_DIR="${CF_PAGES_DIR:-docs}"
DEPLOY_BRANCH="${CF_PAGES_BRANCH:-}"
CUSTOM_DOMAIN="${CF_PAGES_CUSTOM_DOMAIN:-microfilm.browserbox.io}"
WRANGLER_CHECK_TIMEOUT="${CF_PAGES_WRANGLER_CHECK_TIMEOUT:-45}"

log() {
  printf '%s\n' "$*" >&2
}

fail() {
  log "Error: $*"
  exit 1
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "$1 is required."
}

resolve_wrangler() {
  if command -v wrangler >/dev/null 2>&1; then
    WRANGLER=(wrangler)
    return
  fi

  require_cmd npm

  log "Wrangler not found on PATH. Installing it globally with npm..."
  npm install --global wrangler@latest

  hash -r

  command -v wrangler >/dev/null 2>&1 || fail "Wrangler was installed, but 'wrangler' is still not on PATH. Add your npm global bin directory to PATH and retry."
  WRANGLER=(wrangler)
}

run_wrangler() {
  "${WRANGLER[@]}" "$@"
}

run_wrangler_check() {
  if command -v timeout >/dev/null 2>&1; then
    timeout "$WRANGLER_CHECK_TIMEOUT" "${WRANGLER[@]}" "$@"
    return
  fi

  if command -v gtimeout >/dev/null 2>&1; then
    gtimeout "$WRANGLER_CHECK_TIMEOUT" "${WRANGLER[@]}" "$@"
    return
  fi

  "${WRANGLER[@]}" "$@"
}

ensure_project_exists() {
  local project_list_output
  local project_list_status=0
  local create_output
  local create_status=0

  project_list_output="$(run_wrangler_check pages project list --json 2>&1)" || project_list_status=$?
  if [[ "$project_list_status" -eq 124 ]]; then
    fail "Wrangler project lookup timed out after ${WRANGLER_CHECK_TIMEOUT}s. Run 'wrangler pages project list --json' directly and verify Cloudflare connectivity before retrying."
  fi
  if [[ "$project_list_status" -ne 0 ]]; then
    printf '%s\n' "$project_list_output" >&2
    fail "Unable to list Cloudflare Pages projects."
  fi

  if printf '%s\n' "$project_list_output" | grep -Eq "\"(name|Project Name)\"[[:space:]]*:[[:space:]]*\"${PROJECT_NAME}\""; then
    return 0
  fi

  log "Creating Cloudflare Pages project '${PROJECT_NAME}'..."
  create_output="$(run_wrangler pages project create "$PROJECT_NAME" --production-branch "$PRODUCTION_BRANCH" 2>&1)" || create_status=$?
  if [[ "$create_status" -ne 0 ]]; then
    if printf '%s\n' "$create_output" | grep -Fq "already exists"; then
      log "Cloudflare Pages project '${PROJECT_NAME}' already exists."
      return 0
    fi

    printf '%s\n' "$create_output" >&2
    return "$create_status"
  fi

  printf '%s\n' "$create_output" >&2
}

main() {
  cd "$REPO_ROOT"

  [[ -d "$PUBLISH_DIR" ]] || fail "Publish directory '$PUBLISH_DIR' does not exist."

  require_cmd git
  resolve_wrangler

  log "Checking Wrangler authentication..."
  local auth_status=0
  run_wrangler_check whoami || auth_status=$?
  if [[ "$auth_status" -eq 124 ]]; then
    fail "Wrangler auth check timed out after ${WRANGLER_CHECK_TIMEOUT}s. Run 'wrangler whoami' directly and verify Cloudflare connectivity before retrying."
  fi
  if [[ "$auth_status" -ne 0 ]]; then
    fail "Wrangler is not authenticated. Run 'wrangler login' or export CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID."
  fi

  if [[ -z "$DEPLOY_BRANCH" ]]; then
    DEPLOY_BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || printf '%s' "$PRODUCTION_BRANCH")"
  fi

  ensure_project_exists

  cp install.* docs/

  COMMIT_HASH="$(git rev-parse HEAD)"
  COMMIT_MESSAGE="$(git log -1 --pretty=%s)"

  log "Deploying '$PUBLISH_DIR' to Cloudflare Pages project '$PROJECT_NAME' on branch '$DEPLOY_BRANCH'..."
  run_wrangler pages deploy "$PUBLISH_DIR" \
    --project-name "$PROJECT_NAME" \
    --branch "$DEPLOY_BRANCH" \
    --commit-hash "$COMMIT_HASH" \
    --commit-message "$COMMIT_MESSAGE"

  if [[ "$DEPLOY_BRANCH" == "$PRODUCTION_BRANCH" ]]; then
    log "Production URL: https://${PROJECT_NAME}.pages.dev"
  else
    log "Preview URL: https://${DEPLOY_BRANCH}.${PROJECT_NAME}.pages.dev"
  fi

  log "Attach custom domain '$CUSTOM_DOMAIN' in Cloudflare Pages once DNS is ready."
}

main "$@"
