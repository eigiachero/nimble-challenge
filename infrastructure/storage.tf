resource "google_storage_bucket" "build_logs" {
  project                     = local.project_id
  name                        = "${local.project_name}-build-logs"
  uniform_bucket_level_access = true
  labels                      = {}
  location                    = var.region
}
