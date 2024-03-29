resource "aws_cloudwatch_event_rule" "check_after_destiny_reset" {
  name                = "check-after-destiny-reset"
  description         = "Fires daily every fiveteen mins after reset for six hours"
  schedule_expression = "cron(0/15 17-20 * * ? *)"
}

output "aws_cloudwatch_event_rule_once_daily_at_destiny_reset_arn" {
  value = aws_cloudwatch_event_rule.check_after_destiny_reset.arn
}

output "aws_cloudwatch_event_rule_once_daily_at_destiny_reset_name" {
  value = aws_cloudwatch_event_rule.check_after_destiny_reset.name
}
