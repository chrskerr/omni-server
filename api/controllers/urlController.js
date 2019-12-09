const Url = 'database-coming-soon';

exports.show = (req, res) => {
  Url.find({}, (err, words) => {
    if (err) res.send(err);
    res.json(words);
  })
};

exports.add = (req, res) => {
  const newUrl = new Url(req.body);
  newWord.save((err, word) => {
    if (err) res.send(err);
    res.json(word);
  });
};
