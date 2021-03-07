resource "aws_cloudwatch_event_rule" "once_daily_at_destiny_reset" {
  name                = "once_daily_at_destiny_reset"
  description         = "Fires once daily at Destiny reset"
  schedule_expression = "cron(0/5 17-24 * * ? *)"
}

output "aws-cloudwatch-event-rule-once-daily-at-destiny-reset-arn" {
  value = aws_cloudwatch_event_rule.once_daily_at_destiny_reset.arn
}

output "aws-cloudwatch-event-rule-once-daily-at-destiny-reset-name" {
  value = aws_cloudwatch_event_rule.once_daily_at_destiny_reset.name
}
