# CSE FRESHERS WEBSITE

## Below are some resources for learning Git and Github:

- [Learning Basic Git](https://youtu.be/USjZcfj8yxE)
- [Pro Git book (Advanced)](https://www.pdfdrive.com/download.pdf?id=33757865&h=4efc2ba84a36e4a3fbef1e962524a10e&u=cache&ext=pdf)
- [Learning Basic Github](https://youtu.be/nhNq2kIvi9s)
- [Github Official Resource List](https://try.github.io/)
- https://www.atlassian.com/git

## Steps to setup
- Fork this and create a PR (or better, dm to extend you the ownership)
- Setup Environment
  - Use cloud9 (or any other online environment to decrease the hassle)
  - Or work on your local machine
- Install Node, npm and MongoDB(not necessary currently)
- Clone the repo
  - If owner, run `git clone https://github.com/deprov447/cse-fresher-website`
  - else `git clone https://github.com/<your_handle_name>/cse-fresher-website`
- Go to `cse-fresher-website` folder
- Create a file `dev.json` in `backEnd/config` and paste this :

> {
>   "PORT": 3000,
>   "MONGO_URL": "db_server",
>   "APIKEY": "dev",
>   "TOKEN_KEY": "token"
> }

- Run `npm install`
- Run `npm start`
- Open `localhost:3000` on browser.
- **Start Contributing**

Follow [Contribution Guidelines](https://github.com/deprov447/cse-fresher-website/blob/master/CONTRIBUTING.md) 

To see the work done - [Click here](https://ancient-coast-19809.herokuapp.com/)

## Please create a new branch before any major change. Don't push directly to main branch.

Thanks for everyone's effort.
