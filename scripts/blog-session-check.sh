#!/bin/sh
# SessionStart hook: if today's trycheese journal post doesn't exist yet,
# ask Claude to write it with the trycheese-daily-post skill.
DIR="/Users/kruthivarsh/Pictures/Trycheese/content/blog"
TODAY=${TC_TODAY:-$(date +%F)}
if ls "$DIR/$TODAY-"*.md >/dev/null 2>&1; then
  exit 0
fi
cat <<JSON
{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"trycheese daily journal: there is no post for $TODAY yet in $DIR. The user asked for one post per day, published automatically. At the start of this session, tell the user in one line that you're writing today's journal post, then run the trycheese-daily-post skill end to end (research, write, internal links, build, validate, commit and push). If the user's first message is urgent, handle it first and write the post right after."}}
JSON
