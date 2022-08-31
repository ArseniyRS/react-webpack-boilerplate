
SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"


if [[ -n "$1" ]]; then
  mkdir -p $SCRIPTPATH/../src/store/$1
  mkdir -p $SCRIPTPATH/../src/store/$1/actions
  touch $SCRIPTPATH/../src/store/$1/index.ts
  touch $SCRIPTPATH/../src/store/$1/actions/index.ts
  sed -e "s/SLICE_NAME/$1/g" $SCRIPTPATH/code_templates/slice.js > $SCRIPTPATH/../src/store/$1/index.ts
else
  echo "Write slice name"
fi