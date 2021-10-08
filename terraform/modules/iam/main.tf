resource "aws_iam_role" "destiny_insights_bot" {
  name               = "destiny-insights-bot"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": {
    "Action": "sts:AssumeRole",
    "Principal": {
        "Service": [
          "lambda.amazonaws.com"
        ]
      },
    "Effect": "Allow"
  }
}
POLICY
}

resource "aws_iam_policy" "destiny_insights_bot_logs" {
  name        = "destiny-insights-bot-logs"
  description = "Adds logging access"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "attach_logs" {
  role       = aws_iam_role.destiny_insights_bot.name
  policy_arn = aws_iam_policy.destiny_insights_bot_logs.arn
}

resource "aws_iam_policy" "destiny_insights_bot_sns" {
  name        = "destiny-insights-bot-sns"
  description = "Adds sns access"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sns:Publish",
      "Resource": "${var.error_sns_topic}"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "attach_sns" {
  role       = aws_iam_role.destiny_insights_bot.name
  policy_arn = aws_iam_policy.destiny_insights_bot_sns.arn
}

resource "aws_iam_policy" "destiny_insights_bot_parameter_store" {
  name        = "destiny-insights-bot-parameter-store"
  description = "Adds Parameter Store access"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ssm:GetParametersByPath",
      "Resource": [
        "${var.parameter_store_twitter_auth_arn}"
      ]
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "attach_parameter_store" {
  role       = aws_iam_role.destiny_insights_bot.name
  policy_arn = aws_iam_policy.destiny_insights_bot_parameter_store.arn
}

resource "aws_iam_policy" "destiny_insights_mods" {
  name        = "destiny-insights-mods-dynamodb"
  description = "Adds DynamoDB access"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:Scan",
        "dynamodb:PutItem"
      ],
      "Resource": "${var.destiny_insights_mods_arn}"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "attach_destiny_insights_mods_dynamodb" {
  role       = aws_iam_role.destiny_insights_bot.name
  policy_arn = aws_iam_policy.destiny_insights_mods.arn
}

resource "aws_iam_policy" "destiny_insights_xur" {
  name        = "destiny-insights-xur-dynamodb"
  description = "Adds DynamoDB access"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:Scan",
        "dynamodb:PutItem"
      ],
      "Resource": "${var.destiny_insights_xur_arn}"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "attach_destiny_insights_xur_dynamodb" {
  role       = aws_iam_role.destiny_insights_bot.name
  policy_arn = aws_iam_policy.destiny_insights_xur.arn
}

output "aws_iam_role_destiny_insights_bot_arn" {
  value = aws_iam_role.destiny_insights_bot.arn
}
