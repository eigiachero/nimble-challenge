resource "google_project_iam_member" "view_cloudbuild_logs" {
  for_each = toset([])

  depends_on = [google_project_service.service["cloudbuild.googleapis.com"]]
  role       = "roles/cloudbuild.builds.viewer"
  project    = local.project_id
  member     = "user:${each.key}"
}

resource "google_storage_bucket_iam_member" "view_storage_cloudbuild_logs" {
  for_each = toset([])

  bucket = google_storage_bucket.build_logs.name
  role   = "roles/storage.legacyObjectReader"
  member = "user:${each.key}"
}

resource "google_project_iam_member" "cloudbuild" {
  depends_on = [google_project_service.service["cloudbuild.googleapis.com"]]
  for_each = toset([
    "roles/iam.serviceAccountUser",
    "roles/cloudbuild.builds.builder",
    "roles/run.admin",
    "roles/firebase.admin",
    "roles/serviceusage.apiKeysAdmin",
    "roles/secretmanager.secretAccessor"
  ])

  project = local.project_id
  role    = each.key
  member  = "serviceAccount:${data.google_project.project.number}@cloudbuild.gserviceaccount.com"
}

resource "google_project_iam_member" "cloudbuild_service" {
  depends_on = [google_project_service.service["cloudbuild.googleapis.com"]]
  for_each = toset([
    "roles/secretmanager.secretAccessor"
  ])

  project = local.project_id
  role    = each.key
  member  = "serviceAccount:service-${data.google_project.project.number}@gcp-sa-cloudbuild.iam.gserviceaccount.com"
}

resource "google_project_iam_member" "cloudrun" {
  depends_on = [google_project_service.service["run.googleapis.com"]]
  for_each = toset([
    "roles/cloudsql.client",
    "roles/secretmanager.secretAccessor"
  ])

  project = local.project_id
  role    = each.key
  member  = "serviceAccount:service-${data.google_project.project.number}@serverless-robot-prod.iam.gserviceaccount.com"
}

resource "google_project_iam_member" "compute" {
  depends_on = [google_project_service.service["compute.googleapis.com"]]
  for_each = toset([
    "roles/secretmanager.secretAccessor",
    "roles/iam.serviceAccountTokenCreator"
  ])

  project = local.project_id
  role    = each.key
  member  = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
}
