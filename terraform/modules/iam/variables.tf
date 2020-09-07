variable "error_sns_topic" {
  description = "SNS Topic ARN to trigger on lambda failure"
  type = string
}

variable "secret" {
  description = "Secret Manager secret ARN"
  type = string
}
