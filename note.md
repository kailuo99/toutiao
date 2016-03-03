#总结点

1. An App ID with Identifier is not available. Please enter a different string.

    如果你的apple 帐号可用，那么很大可能是你的bundle Identifier 的名字没别人注册过了。这个是每个app的唯一码，不允许重复。

2. linker command failed with exit code 1

    在 Build Setting 中设置 Dead Code Stripping 为 No 
