# GamesClient v18.0.1

## Delete all local branches other than master
```
git branch -D `git branch --merged | grep -v \* | xargs`
```
