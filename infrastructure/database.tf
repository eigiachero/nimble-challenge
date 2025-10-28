resource "google_sql_database_instance" "backend_db" {
  name                = "backend"
  database_version    = "POSTGRES_17"
  region              = var.region
  project             = local.project_id
  deletion_protection = local.is_production

  depends_on = [
    google_project_service.service["sqladmin.googleapis.com"],
  ]

  settings {
    tier              = "db-f1-micro"
    edition           = "ENTERPRISE"
    disk_size         = 10
    availability_type = "ZONAL"

    ip_configuration {
      ipv4_enabled = true
    }

    backup_configuration {
      enabled            = false
    }
  }
}

resource "google_sql_database" "backend_db" {
  name     = "backend"
  instance = google_sql_database_instance.backend_db.name
  project = google_sql_database_instance.backend_db.project
}
