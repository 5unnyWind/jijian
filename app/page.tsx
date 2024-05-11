import { login } from "./actions";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div
        className="absolute min-h-screen w-screen left-0 top-0"
        style={{ backgroundImage: `url(/bg1.png)`, backgroundSize: "cover" }}
      ></div>
      <div>极减</div>
      <div>登录↗</div>
      <div>RELAX YOUR LIFE.</div>
      <form action={login}>
        <input
          type="text"
          placeholder="请输入账号"
          className="bg-transparent outline-none border-b-2 rounded-sm"
        />
        <input
          type="password"
          placeholder="请输入密码"
          className=" bg-transparent outline-none border-b-2 rounded-sm"
        />
        <div>
          <button type="submit">登录</button>
        </div>
      </form>
      <div>注册</div>
    </main>
  );
}
