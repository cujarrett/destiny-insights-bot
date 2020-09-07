variable "error_sns_topic" {
  description = "SNS Topic ARN to trigger on lambda failure"
  type = string
}

variable "data-archive-file-placeholder-output-path" {
  description = "Placeholder content for Lambda"
  type = string
}

variable "aws-iam-role-banshee-44-mods-bot-arn" {
  description = "AWS IAM Role ARN for banshee-44-mods-bot"
  type = string
}

variable "aws-cloudwatch-event-rule-once-daily-at-destiny-reset-arn" {
  description = "AWS CloudWatch Event Rule ARN for once daily at Destiny reset"
  type = string
}

variable "aws-cloudwatch-event-rule-once-daily-at-destiny-reset-name" {
  description = "AWS CloudWatch Event Rule name for once daily at Destiny reset"
  type = string
}
