# FastCounting
Game to train to count fast without calculators written with NodeJS.

# Running
## Prerequisites
- `docker`.
## Starting
1. Clone the repository
```sh
git clone https://github.com/EvorsioDev/FastCounting fast-counting
```
2. Cd into `fast-counting`
```sh
cd fast-counting
```
3. Build docker container
```sh
docker built . -t fast-counting
```
4. Run docker container
```sh
docker run --rm -d -p 8080:3000 fast-counting:latest
```
