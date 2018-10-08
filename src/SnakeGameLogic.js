import { ROWS, COLS } from "./config";

// NOTE: ROWS, COLS에는 행의 개수, 열의 개수가 저장되어 있습니다.
// 이 변수를 활용해서 코드를 작성하세요!

function SnakeGameLogic() {
  // 각 마디의 좌표를 저장하는 배열
  this.joints = [{ x: 5, y: 2 }, { x: 4, y: 2 }, { x: 3, y: 2 }];

  // 먹이의 좌표
  // 게임이 새로 시작할 때마다 새로운 위치에 먹이를 생성
  this.fruit = {
    x: Math.floor(Math.random() * COLS),
    y: Math.floor(Math.random() * ROWS)
  };
}

// 뱀이 처음에 움직이는 방향
this.direction = "right";

SnakeGameLogic.prototype.up = function() {
  // 위쪽 화살표 키를 누르면 실행되는 함수
  this.direction = "up";
  console.log("up");
};

SnakeGameLogic.prototype.down = function() {
  // 아래쪽 화살표 키를 누르면 실행되는 함수
  this.direction = "down";
  console.log("down");
};

SnakeGameLogic.prototype.left = function() {
  // 왼쪽 화살표 키를 누르면 실행되는 함수
  this.direction = "left";
  console.log("left");
};

SnakeGameLogic.prototype.right = function() {
  // 오른쪽 화살표 키를 누르면 실행되는 함수
  this.direction = "right";
  console.log("right");
};

SnakeGameLogic.prototype.nextState = function() {
  // 한 번 움직여야 할 타이밍마다 실행되는 함수

  if (this.direction === "up") {
    this.joints.pop();
    this.joints.unshift({
      x: this.joints[0].x,
      y: this.joints[0].y - 1
    });
  } else if (this.direction === "down") {
    this.joints.pop();
    this.joints.unshift({
      x: this.joints[0].x,
      y: this.joints[0].y + 1
    });
  } else if (this.direction === "left") {
    this.joints.pop();
    this.joints.unshift({
      x: this.joints[0].x - 1,
      y: this.joints[0].y
    });
  } else {
    this.joints.pop();
    this.joints.unshift({
      x: this.joints[0].x + 1,
      y: this.joints[0].y
    });
  }

  // 뱀이 먹이를 먹었을 때 먹이를 맵에 재생성하기, 그리고 이 if문 안에 먹이를 먹으면 머리가 붙는 코드를 적어야 한다.
  // 머리를 먹는 진행방향에 따라서 머리가 추가되어야 하기 때문에 4방향의 설정이 모두 필요!
  // 하지만!!! 벽에 붙은 먹이를 먹으면 머리가 추가되자마자 죽기 때문에, 나는 먹이를 먹으면 꼬리에 붙게 설정!
  if (this.joints[0].x === this.fruit.x && this.joints[0].y === this.fruit.y) {
    this.fruit = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS)
    };
    if (this.direction === "up") {
      this.joints.push({
        x: this.joints[this.joints.length - 1].x,
        y: this.joints[this.joints.length - 1].y + 1
      });
    } else if (this.direction === "down") {
      this.joints.push({
        x: this.joints[this.joints.length - 1].x,
        y: this.joints[this.joints.length - 1].y - 1
      });
    } else if (this.direction === "left") {
      this.joints.push({
        x: this.joints[this.joints.length - 1].x + 1,
        y: this.joints[this.joints.length - 1].y
      });
    } else {
      this.joints.push({
        x: this.joints[this.joints.length - 1].x - 1,
        y: this.joints[this.joints.length - 1].y
      });
    }
  }

  // 뱀의 몸통에 먹이가 생성되면 다시 먹이를 생성

  for (let i = 1; i < this.joints.length; i++) {
    if (
      this.joints[i].x === this.fruit.x &&
      this.joints[i].y === this.fruit.y
    ) {
      this.fruit = {
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS)
      };
    }
  }

  // 뱀의 머리가 몸에 닿아도 게임이 끝남 - for문을 사용해서 뱀의 몸을 표현
  for (let i = 1; i < this.joints.length; i++) {
    if (
      this.joints[i].x === this.joints[0].x &&
      this.joints[i].y === this.joints[0].y
    ) {
      return false;
    }
  }

  // 벽에 닿으면 게임이 끝남
  if (
    this.joints[0].x < 0 ||
    this.joints[0].y < 0 ||
    this.joints[0].x >= COLS ||
    this.joints[0].y >= ROWS
  ) {
    return false;
  }

  // 게임이 아직 끝나지 않았으면 `true`를 반환
  // 게임이 끝났으면 `false`를 반환

  console.log(`nextState`);
  return true;
};

export default SnakeGameLogic;
