# OpenCPI CDN
To install:

1: download the code

2: place the disney CDN files in ``./CDN_FILES``

3: replace your ``__mapping_cpremix_prod.json`` with the contents of ``__mapping_cpremix_prod.json.default``

4: add your ip into cdn.patch.js

5: cd into the code and run ``node cdn.patch.js`` and ``DEBUG=express:* node index.js``


6: load up CPI and set ``debug mode -> network -> content`` to ``http://YOUR_IP:300/cdn/``

7: reload your game and see what ClientManifestDirectory is requested in console

8: find that file and replace the urls for 1.13 with the urls from 1.12

9: delete the cached manifests

10: enjoy 