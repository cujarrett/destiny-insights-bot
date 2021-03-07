resource "aws_cloudwatch_event_rule" "check-after-destiny-reset" {
  name                = "check-after-destiny-reset"
  description         = "Fires daily every five mins after reset for six hours"
  schedule_expression = "cron(0/5 17-23 * * ? *)"
}

output "aws-cloudwatch-event-rule-once-daily-at-destiny-reset-arn" {
  value = aws_cloudwatch_event_rule.check-after-destiny-reset.arn
}

output "aws-cloudwatch-event-rule-once-daily-at-destiny-reset-name" {
  value = aws_cloudwatch_event_rule.check-after-destiny-reset.name
}
