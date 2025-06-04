#!/bin/bash

cd /e/GitHub/courses/goit-node

declare -A repos=(
  ["01-console-apps"]="https://github.com/brzozanet/goit-node-hw-01.git"
  ["02-node-tasks"]="https://github.com/brzozanet/goit-node-hw-02-06.git"
)

for folder in "${!repos[@]}"; do
  alias_name="gn${folder//./-}"

  echo "🔄 Importuję $folder z ${repos[$folder]}"
  git remote add "$alias_name" "${repos[$folder]}"
  git fetch "$alias_name"

  echo "📁 Dodaję do folderu: $folder"
  git subtree add --prefix="$folder" "$alias_name" main

  echo "🧹 Usuwam remote: $alias_name"
  git remote remove "$alias_name"

  echo "✅ Gotowe: $folder"
  echo "----------------------------------------"
done

echo "🚀 Wszystkie repozytoria zostały zaimportowane do goit-node!"
