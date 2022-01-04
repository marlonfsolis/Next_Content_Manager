const data = [
  {
    id: "1",
    title: "Learning Singleton Pattern",
    description: "I would like to learn singleton in JS language, it's important for my work",
    link: "https://link.com",
    image: "https://image.com",
    priority: 3,
    timeToFinish: 120,
    active: true,
    createdAt: '2021-12-05'
  },
  {
    id: "2",
    title: "Resource 2",
    description: "Resource 2 Desc",
    link: "https://link.com",
    image: "https://image.com",
    priority: 2,
    timeToFinish: 60,
    active: false,
    createdAt: '2021-05-23'
  },
  {
    id: "3",
    title: "Resource 3",
    description: "Resource 3 Desc",
    link: "https://link.com",
    image: "https://image.com",
    priority: 1,
    timeToFinish: 30,
    active: false,
    createdAt: '2021-01-10'
  }
];

const Resources = (req, res) => {
  res.send(data);
  return;
};

export default Resources;


