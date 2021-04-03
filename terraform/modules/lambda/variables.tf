variable "error_sns_topic" {
  description = "SNS Topic ARN to trigger on lambda failure"
  type = string
}

variable "data_archive_file_placeholder_output_path" {
  description = "Placeholder content for Lambda"
  type = string
}

variable "aws_iam_role_destiny_insights_bot_arn" {
  description = "AWS IAM Role ARN for destiny-insights-bot"
  type = string
}

variable "aws_cloudwatch_event_rule_once_daily_at_destiny_reset_arn" {
  description = "AWS CloudWatch Event Rule ARN for once daily at Destiny reset"
  type = string
}

variable "aws_cloudwatch_event_rule_once_daily_at_destiny_reset_name" {
  description = "AWS CloudWatch Event Rule name for once daily at Destiny reset"
  type = string
}
