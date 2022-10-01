# !bin/sh


mkdir src
mv pages src/
rm  -r styles
rm -r src/api
rm src/pages/index.tsx
echo "import React from "react";

function index() {
  return <div></div>;
}

export default index;
" src/pages/index.tsx

