# for b in `git branch --merged | grep -v \*`; do git branch -D $b; done
git remote prune origin