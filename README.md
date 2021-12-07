# bulkrename
CLI for bulk-updating files name  

Using Cliffy as CLI framework  
https://github.com/c4spar/deno-cliffy/tree/main/command

## Usage

pull and run below to generate UNIX executable
```
$ deno compile --allow-read --allow-write index.ts
```

Run command below to **rename `index.tsx` to `index.page.tsx` in `./src/pages`**.  
```
$ bulkrename index.tsx index.page.tsx ./src/pages
```

## Help

This will be executed iteratively, so you don't have to run command in every directory.


```
$ deno run index.ts -h

  Usage:   bulkrename [target-filename] [filename-to-be] [directory]
  Version: bulkrename 0.1.0                                         

  Description:

    for bulk-updating files name

  Options:

    -h, --help     - Show this help.                            
    -V, --version  - Show the version number for this program.
```
