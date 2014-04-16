// sample...
Header "header"
    = module:ModuleNameLine project:ProjectInfoLine author:DefinitionAuthorLine definitions:DefinitionsLine .*
    ;

ModuleNameLine
    = "//" _ "Type definitions for" Space _ name:ModuleName version:ModuleVersion Newline
    ;

ModuleName "module name"
    = $((!ModuleVersion !Newline .)+)
    ;

// TODO
ModuleVersion "module version"
    = $(([0-9]+ ".")* [0-9]+)
    ;

// TODO
Semver "semantic version"
    = ""
    ;

ProjectInfoLine
    = "//" _ "Project:" _ url:Url Newline
    ;

// TODO
Url "url"
    = $("http" (!Newline [^>])+)
    ;

DefinitionAuthorLine
    = "//" _ "Definitions by:" _ authorInfo:AuthorInfo Newline

AuthorInfo
    = name:AuthorName url:AuthorHomepage
    ;

AuthorName "author name"
    = $((!AuthorHomepage !Newline .)+)
    ;

AuthorHomepage "author homepage"
    = "<" url:Url ">"
    ;

DefinitionsLine
    = "//" _ "Definitions:" _ url:Url Newline
    ;

Newline "newline"
    = "\r\n"
    / "\n"
    ;

_ "spacer"
    = $(Space*)
    ;

Space "space"
    = [ 　\t]
    ;
