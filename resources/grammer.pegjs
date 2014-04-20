// sample...
Header "header"
    = BOM? module:ModuleNameLine project:ProjectInfoLine authors:DefinitionAuthorLine+ definitions:DefinitionsLine .*
    ;

ModuleNameLine
    = "//" _ "Type definitions for" Space _ name:ModuleName version:ModuleVersion? _ Newline
    ;

ModuleName "module name"
    = $((!ModuleVersion !Newline .)+)
    ;

// TODO range support
ModuleVersion "module version"
    = $(Semver)
    / $("v" Digits ("." Digits)+)
    ;

Semver "semantic version"
    = major:Digits "." minor:Digits "." patch:Digits ( "-" pre:( [0-9A-Za-z-.]+ ) )? ( "+" meta:( [0-9A-Za-z-.]+ ) )?
    ;

Digits "digits"
    = $([0-9]+)
    ;

ProjectInfoLine
    = "//" _ "Project:" _ url:Url _ Newline
    ;

// TODO if improve Url pattern, we can optimization other part.
Url "url"
    = $("http" "s"? "://" (!Newline !Space [^<>])+)
    ;

DefinitionAuthorLine
    = "//" _ "Definitions by:" _ authorInfo:AuthorInfo authorInfos:(_ AuthorDivider _ AuthorInfo)* _ Newline

AuthorDivider
    = ","
    / "and"
    / Newline _ "//" _ "Definitions by:"
    / Newline "//"
    ;

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
    = "//" _ ("Definitions:" / "DefinitelyTyped:") _ url:Url _ Newline
    ;

Newline "newline"
    = "\r\n"
    / "\n"
    ;

_ "spacer"
    = $(Space*)
    ;

Space "space"
    = [ 　\t\v\f]
    ;

BOM
    = [\uFEFF]
    ;
