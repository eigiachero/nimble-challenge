locals {
  secrets = toset(concat([
    "DB_USER",
    "DB_PASSWORD",
    "JWT_SECRET_KEY",
  ]))
}

resource "google_secret_manager_secret" "default" {
  for_each = local.secrets
  secret_id = each.key
  depends_on = [google_project_service.service["secretmanager.googleapis.com"]]

  replication {
    auto {}
  }
}

moved {
  from = google_secret_manager_secret.default[0]
  to = google_secret_manager_secret.default["DB_USER"]
}

moved {
  from = google_secret_manager_secret.default[1]
  to = google_secret_manager_secret.default["DB_PASSWORD"]
}

moved {
  from = google_secret_manager_secret.default[2]
  to = google_secret_manager_secret.default["JWT_SECRET_KEY"]
}