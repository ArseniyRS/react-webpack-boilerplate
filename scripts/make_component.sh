
SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

if [[ -n "$1" && "$2" ]]; then
  mkdir -p $SCRIPTPATH/../src/$2/$1
  touch $SCRIPTPATH/../src/$2/$1/$1.tsx
  touch $SCRIPTPATH/../src/$2/$1/index.tsx
  touch $SCRIPTPATH/../src/$2/$1/$1.module.scss

  sed -e "s/COMPONENT_NAME/$1/g" $SCRIPTPATH/code_templates/component.js > $SCRIPTPATH/../src/$2/$1/$1.tsx  
  sed -e "s/COMPONENT_NAME/$1/g" $SCRIPTPATH/code_templates/component_index.js > $SCRIPTPATH/../src/$2/$1/index.tsx
  exit 1
fi
if [[ -n "$1" ]]; then
  mkdir -p $SCRIPTPATH/../src/components/$1
  touch $SCRIPTPATH/../src/components/$1/$1.tsx
  touch $SCRIPTPATH/../src/components/$1/index.tsx
  touch $SCRIPTPATH/../src/components/$1/$1.module.scss

  sed -e "s/COMPONENT_NAME/$1/g" $SCRIPTPATH/code_templates/component.js > $SCRIPTPATH/../src/components/$1/$1.tsx  
  sed -e "s/COMPONENT_NAME/$1/g" $SCRIPTPATH/code_templates/component_index.js > $SCRIPTPATH/../src/components/$1/index.tsx
else
  echo "Write component name"
fi