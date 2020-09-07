variable "aws_region" {
  description = "Region for the infrastructure"
  type = string
  default = "us-east-1"
}

variable "error_sns_topic" {
  description = "SNS Topic ARN to trigger on lambda failure"
  type = string
}

variable "secret" {
  description = "Secret Manager secret ARN"
  type = string
}
