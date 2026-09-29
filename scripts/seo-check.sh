#!/usr/bin/env bash
BASE=${BASE:-https://xgrcsoftware.com}
pass(){ echo "PASS $1"; }; fail(){ echo "FAIL $1"; FAILED=1; }
code(){ curl -s -o /dev/null -w '%{http_code}' "$BASE$1"; }
loc(){ curl -s -o /dev/null -w '%{redirect_url}' "$BASE$1" | sed "s#^$BASE##"; }
# Sitemap URLs are absolute production URLs; point them at BASE so a staging run tests staging
onbase(){ echo "$1" | sed "s#^https://xgrcsoftware.com#$BASE#"; }

# T1 real 404
[ "$(code /this-page-does-not-exist-xyz/)" = 404 ] && pass T1 || fail T1

# T2 redirects: from|to
while IFS='|' read -r f t; do
  [ "$(code "$f")" = 301 ] && [ "$(loc "$f")" = "$t" ] && [ "$(code "$t")" = 200 ] \
    && pass "T2 $f" || fail "T2 $f -> $(loc "$f")"
done <<'EOF'
/contact-us/|/contact/
/contact-page/|/contact/
/xgrc-products/|/solutions/
/legal/website-terms|/legal/website-terms-of-use/
/2017/10/04/what-is-pas-99-for-integrated-management-systems/|/insights/what-is-pas-99/
/2019/10/09/what-is-vendor-compliance-management/|/insights/vendor-compliance-management/
EOF

# T4 no SearchAction
curl -s "$BASE/" | grep -q SearchAction && fail T4 || pass T4

# T5 md canonical header
curl -sI "$BASE/erm.md" | grep -qi 'rel="canonical"' && pass T5 || fail T5

# T6 every sitemap URL returns 200
for sm in $(curl -s "$BASE/sitemap-index.xml" | grep -o '<loc>[^<]*' | sed 's/<loc>//'); do
  for u in $(curl -s "$(onbase "$sm")" | grep -o '<loc>[^<]*' | sed 's/<loc>//'); do
    u=$(onbase "$u")
    c=$(curl -s -o /dev/null -w '%{http_code}' "$u"); [ "$c" = 200 ] || fail "T6 $u $c"
  done
done; pass "T6 sitemap scan done"

# T9/T10 titles
curl -s "$BASE/" | grep -q '<title>GRC Software South Africa' && pass T9 || fail T9
curl -s "$BASE/erm/" | grep -q '<title>ERM Software South Africa' && pass T10 || fail T10

exit ${FAILED:-0}
