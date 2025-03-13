# 문제 1

NestJS 기반의 백엔드 서비스에서 **사용자 등록 API**를 구현하세요.

이 API는 새로운 사용자를 등록하고, 비밀번호를 안전하게 저장해야 합니다.

## 요구사항

**1. API 엔드포인트 -** POST /users

요청 바디 예시

```jsx
{
"name": "John Doe",
"email": "[john@example.com](mailto:john@example.com)",
"password": "securePassword123"
}
```

성공시 응답

```jsx
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2025-01-21T07:33:37.696Z"
}
```

실패시 응답

```jsx
{
  "statusCode": 409,
  "message": "Email already exists"
}
```

```jsx
{
  "statusCode": 400,
  "message": "Password must be at least 8 characters long"
}
```

**유효성 검사**

- name 필드는 최소 2자 이상, 최대 50자 이내여야 합니다.
- email 필드는 올바른 이메일 형식이어야 합니다.
- password는 최소 8자 이상이어야 하며, 숫자와 문자가 포함되어야 합니다.

**이메일 중복 검사**

- 이미 존재하는 이메일로 회원가입을 시도하면 409 Conflict 응답을 반환해야 합니다.

**비밀번호 해싱**

- 비밀번호를 암호화 하여 안전하게 저장해야 합니다.

**에러 핸들링**

- 입력값이 올바르지 않을 경우 400 Bad Request를 반환해야 합니다.

**데이터베이스 연동 (TypeORM 사용)**

- MySQL을 사용하며, **TypeORM 엔터티**를 정의하여 데이터를 저장해야 합니다.

---

# Solution

- server 폴더에 코드를 구현했습니다.
- 샘플 .env 를 추가했습니다.
- E2E Test 코드를 포함했습니다.
- 실행 후 localhost:3000/api 에서 Swagger 명세를 확인할 수 있습니다.

### 💡 추가질문 - 비밀번호 해싱처리는 왜 하는걸까요?

1. 단방향 암호화를 통해 원본 password를 추측하지 못하게 하기 위함입니다. 해커 혹은 개발자에게 사용자의 중요한 정보를 노출시키지 않을 수 있으며 무차별 대입공격을 막기위해 salt를 추가하는 등 추가적인 보안요소를 더합니다.

2. 사용자의 password를 저장하기 위해선 반드시 암호화 된 password를 저장하도록 정보통신망법에 의해 강제되고 있습니다.

3. 추가적인 보안요소로 id가 틀렸는지 pw가 틀렸는지 정확한 정보를 주지 않고 `id 혹은 pw가 틀렸습니다` 와 같은 메시지를 주는 방법이 있습니다.
