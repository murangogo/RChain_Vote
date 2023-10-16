import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import styles from './Welcome.module.css';

function HomePage() {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");

  return (
    <div>
        <div className={styles.welcomepage}>
      <h1>欢迎，{username}!</h1>
		<p>自由编辑问卷，收集数据。</p>
		<div class={`${styles.container} ${styles.container1} ${styles.welcomebutton}`}>
			<button className='welcomebutton'>
				发布问卷
				<div class={`${styles.fill1}`}></div>
			</button>
		</div>
		<p>查看问卷列表，可以填写问卷也可以分析数据。</p>
		<div className={`${styles.container} ${styles.container2} ${styles.welcomebutton}`}>
			<button>
				查看问卷
				<div class={`${styles.fill2}`}></div>
			</button>
		</div>
        </div>
    </div>
  );
}

export default HomePage;
