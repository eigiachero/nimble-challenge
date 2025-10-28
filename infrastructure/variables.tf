
variable "region" {
  type        = string
  description = "GCP region for resources"
  default     = "us-central1"
}

variable "zone" {
  type        = string
  description = "GCP zone for resources"
  default     = "us-central1-a"
}

variable "production_environment_name" {
  type        = string
  description = "Environment name used for the production environment"
  default     = "production"
}

locals {
  environment   = terraform.workspace
  is_production = local.environment == var.production_environment_name

  project_id                    = "nimble-challenge-giachero"
  project_name                  = "nimble-challenge"
  frontend_cloud_run_service_id = "${local.project_name}-web"
  backend_cloud_run_service_id  = "${local.project_name}-backend"

  frontend_github_branch_name = "master"
  backend_github_branch_name = "master"
}
