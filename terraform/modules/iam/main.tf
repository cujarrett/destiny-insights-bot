resource "aws_iam_role" "banshee-44-mods-bot" {
  name               = "banshee-44-mods-bot"
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

resource "aws_iam_policy" "banshee-44-mods-bot-logs" {
  name        = "banshee-44-mods-bot-logs"
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

resource "aws_iam_role_policy_attachment" "attach-logs" {
  role       = aws_iam_role.banshee-44-mods-bot.name
  policy_arn = aws_iam_policy.banshee-44-mods-bot-logs.arn
}

resource "aws_iam_policy" "banshee-44-mods-bot-sns" {
  name        = "banshee-44-mods-bot-sns"
  description = "Adds sns access"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sns:Publish",
      "Resource": "${var.error-sns-topic}"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "attach-sns" {
  role       = aws_iam_role.banshee-44-mods-bot.name
  policy_arn = aws_iam_policy.banshee-44-mods-bot-sns.arn
}

resource "aws_iam_policy" "banshee-44-mods-bot-secrets-manager" {
  name        = "banshee-44-mods-bot-secrets-manager"
  description = "Adds Secrets Manager access"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetResourcePolicy",
        "secretsmanager:GetSecretValue",
        "secretsmanager:DescribeSecret",
        "secretsmanager:ListSecretVersionIds"
      ],
      "Resource": "${var.secret}"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "attach-secrets-manager" {
  role       = aws_iam_role.banshee-44-mods-bot.name
  policy_arn = aws_iam_policy.banshee-44-mods-bot-secrets-manager.arn
}

resource "aws_iam_policy" "banshee-44-mods-bot-dynamodb" {
  name        = "banshee-44-mods-bot-dynamodb"
  description = "Adds DynamoDB access"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:DeleteItem",
        "dynamodb:Scan"
      ],
      "Resource": "${var.aws-dynamodb-table-banshee-44-mods-bot-arn}"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "attach-dynamodb" {
  role       = aws_iam_role.banshee-44-mods-bot.name
  policy_arn = aws_iam_policy.banshee-44-mods-bot-dynamodb.arn
}

output "aws-iam-role-banshee-44-mods-bot-arn" {
  value = aws_iam_role.banshee-44-mods-bot.arn
}
