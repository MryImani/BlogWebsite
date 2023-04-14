//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
let posts = [
  {
    id: 1,
    title: "Build a Clone of a Website",
    content:
      "Building a website clone is an excellent method to learn the fundamentals of page structure, colors, fonts, media, tables, and other design elements. To duplicate the original, go into as much detail as possible. Choose a website that you enjoy and create a clone of it. To get the most out of the source code, avoid looking at it as much as possible. The benefit of cloning a website is that you may choose the level of complexity. A simple website that simply requires HTML and CSS is a wonderful place to start if you’re just getting started. Choose a website that uses JavaScript or React if you’re more advanced.",
    SkillsRequired: ["HTML", "CSS", "JavaScript"],
    complete: true,
  },
  {
    id: 2,
    title: "Build your own Portfolio Site",
    content:
      "Building a personal portfolio website is one of the most simple yet tough front-end project ideas. You might begin by using your website as a resume. This means you can add information to the website about your experience, talents, and expertise. For this reason, many freelance web designers and developers have lovely personal portfolio websites. To maintain the website entertaining, original, and interactive, you’ll need to apply your HTML, CSS, and JavaScript skills. You should be able to organize a webpage with HTML, style its elements with CSS, and make the website interactive with JS. Also, to upgrade your HTML skills you can enroll in Geeksforgeeks Advanced HTML – Self-Paced course and give your career a hike in web development.",
    SkillsRequired: ["HTML", "CSS", "JavaScript"],
    complete: false,
  },
  {
    id: 3,
    title: "A CRUD Operation Web App",
    content:
      "As a front-end developer, you’ll need to be familiar with CRUD (Create-Read-Update-Delete) operations because they’re a common feature for most websites (including blogs, e-commerce, dashboards, and so on). A To-Do List or a Notes webpage are two examples of CRUD applications. Having one of these projects on your website demonstrates your knowledge of data structures. It’s also an excellent chance to show off your frontend framework skills. Recommended technology: Because CRUD apps require the usage of reusable components, it’s a good idea to develop them with a framework like React or Vue, depending on your level of experience.",
    SkillsRequired: ["JavaScript", "React", "Vue"],
    complete: false,
  },
  {
    id: 4,
    title: "A Dynamic Landing Page",
    content:
      "Once you’ve learned the essentials of front-end development, such as HTML, CSS, and JavaScript, you may go to the next level by exploring Bootstrap’s capabilities. It streamlines your job and boosts your output. With this information, you can use Bootstrap to develop a highly engaging landing page for any product. You may make it more interesting by displaying the user’s time and name from local storage. You may use Bootstrap to reproduce some of your favorite landing sites. You can also start off your journey in the field of  Website Development & create exciting projects with Geeksforgeeks CSS Foundation – Self-Paced course and enhance your logical & analytical acumen. ",
    SkillsRequired: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    complete: true,
  },
  {
    id: 5,
    title: "Build a Weather App",
    content:
      "A weather application can be created with HTML, CSS, and JavaScript. You may use the Open Weather Map API to add weather information. In this project, you may also use AngularJS. To make your website look nice, you can use design-oriented libraries. The Open Weather Map API will provide you with the essential weather information for various locations, and it will be your job to present that information in a pleasant manner. After completing this project, you’ll be familiar with various JS, Angular, and AJAX components. Also, you can use the two building blocks HTML and CSS, by going through Top 10 Projects For Beginners To Practice HTML and CSS Skills and create some amazing applications. ",
    SkillsRequired: ["HTML", "CSS", "JavaScript", "API"],
    complete: false,
  },
  {
    id: 6,
    title: "Build a JavaScript Quiz",
    content:
      "When you first start learning JavaScript, figuring out how to put what you’ve learned into practice and choosing a project that fits within your skillset might be difficult. Building a little quiz game is a great place to start. You’ll have to deal with highly abstract logic, and it’ll be up to you to control and/or expand the range of quiz difficulty. Begin by creating a simple game with four multiple-choice questions. While making these questions up, assign correct answers to each of them. You’ll learn a lot about data management and creating a scoring system while programming.",
    SkillsRequired: ["HTML", "CSS", "JavaScript"],
    complete: true,
  },
  {
    id: 7,
    title: "JavaScript Music Player",
    content:
      "For Front-End Web Development, creating a JavaScript Music Player can be a feasible choice. Everyone should focus on expanding the application’s functionality as a new JavaScript developer, but design and user-experience decisions become more difficult to make without fundamental graphics and architecture in place. So, here’s the architecture, which is divided into three thematic buckets: CSS (adding styling to each element defined in the HTML file) JavaScript (adding elements for audio, player buttons, and music information) (adding functionality when HTML elements are clicked). Advanced Javascript-Self Paced will help you to grab advanced functions of JavaScript.",
    SkillsRequired: ["HTML", "CSS", "JavaScript"],
    complete: false,
  },
];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", { homeContent: homeStartingContent, postList: posts });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose", { contactContent: contactContent });
});

app.get("/posts/:postName", function (req, res) {
  const requestTitle = _.lowerCase(req.params.postName);
  posts.forEach((post) => {
    const postTitle = _.lowerCase(post.title);
    if (postTitle === requestTitle) {
      res.render("post", { postTitle: post.title, postContent: post.content });
    } else console.log("Not a match");
  });
});

app.post("/compose", function (req, res) {
  const postTitle = req.body.postTitle;
  const postBody = req.body.postBody;
  const post = { title: postTitle, content: postBody };
  posts.push(post);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
