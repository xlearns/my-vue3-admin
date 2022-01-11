let {exec,rm,cd,echo,touch,mkdir} = require('shelljs')
let name = process.argv[2] || 'default';
let baseUrl = './src/api'

let apiTemplate = `
import { defHttp } from '@/http';

enum Api {
  One = '/${name}',
}

export function ${name}Api(params:any,mode='modal'){
  return defHttp.post(
    {
      url: Api.One,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
`

cd(baseUrl)
rm('-rf',name)
mkdir(name)
cd(name)
mkdir('model')
echo(apiTemplate).toEnd(`index.ts`)

