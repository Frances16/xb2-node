/* const nature = (callback) => {
  const data = '0';
  callback(data);
};
nature((dat) => {
  console.log(dat);
}); */

/* import { resolve } from 'path';

const nature1 = () => {
  console.log('1');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('2');
    }, 2000);
  });
};

nature1().then((data) => {
  console.log(data);
});

console.log('3'); */

/* import { resolve } from 'path';

 const nature2 = () => {
  console.log('1');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('2');
    }, 2000);
  });
};

const demo = async () => {
  const data = await nature2();
  console.log(data);
};

demo();

console.log('3'); */
