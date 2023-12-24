"use client"

export const runtime = 'edge';

import Image from 'next/image'
import dynamic from 'next/dynamic'
import React, {useState} from "react";

import clsx from 'clsx'
import p5Types from 'p5'

import { getUserData, getOutbox } from '@/lib/api'

import styles from './page.module.scss'

// `dynamic`に渡す関数をあらかじめ定義する
const importFunction = () => import('react-p5').then((mod) => mod.default)
// とりあえずSketchが存在するように
let Sketch: any = null
// `window`が存在する場合はp5が使えます
// さらにインポート時にSSR（サーバーサイドレンダリング）をfalseにすることで
// インポートされたSketchがクライアント側でのみ使うことを宣言
if (typeof window !== 'undefined') {
  Sketch = dynamic(importFunction, { ssr: false })
}

const drawPoint = [
	["", "", "", "","y", "", "", "", ""],
	["", "", "","y","y","y", "", "", ""],
	["", "", "", "","y", "", "", "", ""],
	["", "", "", "","g", "", "", "", ""],
	["", "", "","g","g","g", "", "", ""],
	["", "","g","g","g","g","g", "", ""],
	["", "", "","g","g","g", "", "", ""],
	["", "","g","g","g","g","g", "", ""],
	["","g","g","g","g","g","g","g", ""],
	["", "","g","g","g","g","g", "", ""],
	["","g","g","g","g","g","g","g", ""],
	["g","g","g","g","g","g","g","g","g"],
	["", "", "","g","g","g", "", "", ""],
	["", "", "", "","b", "", "", "", ""],
	["", "", "","b","b","b", "", "", ""],
	["", "","b","b","b","b","b", "", ""]
]

export default function Home() {
  // let isUpdate = false;
  let count = 0;

  const [ userName, setUsername ] = useState("");
  const [ nowLoading, setNowLoading ] = useState(false);
  const [ isUpdate, setIsUpdate ] = useState(false);
  const [ posts, setPosts ] = useState([
    [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
  ]);

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setUsername(e.target.value)
  }

  const getData = async () => {
    setNowLoading(true);
    const userData = await getUserData({ url: userName });
    const userOutbox = await getOutbox({ url: userData.data.outbox });
    let postTmp:any = [
      [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
      [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
    ]
    for (const item of userOutbox) {
      const published = new Date(item.published);
      postTmp[published.getDate() - 24][published.getHours()].push(item)
    }
    setPosts(postTmp);
    setNowLoading(false);
    setIsUpdate(true);
  }

  const setup = (sketch: p5Types) => {
    sketch.createCanvas(640, 480)

    sketch.createCanvas(50*9, 50*16);
    sketch.noStroke();
    sketch.frameRate(30)
  }

  const draw = (sketch: p5Types) => {
    if (!isUpdate) return;
    for (let i=0; i<=15; i++) {
      for (let j=0; j<=8; j++) {
        switch(drawPoint[i][j]){
          case "y":
            sketch.fill("#EEF033");
            break;
          case "g":
            const gColors = [
              "#428612",
              "#438C0F",
              "#499514",
              "#3B7D0D",
              "#468811",
              "#2E8811q"
            ]
            sketch.fill(gColors[Math.floor(Math.random() * 5)]);
            break;
          case "b":
            sketch.fill("#6A3B0B");
            break;
          default:
            sketch.noFill();
            break;
        }
        sketch.rect(j*50, i*50, 50);

        if(drawPoint[i][j] == "g") {
          const postCount = posts.flat()[count].length;
          if(postCount > 0) {
            sketch.fill("red");
            if (postCount < 6) sketch.circle(j*50+25, i*50+25, postCount * 5);
            else sketch.circle(j*50+25, i*50+25, 30);
          }
  
          count++;
        }
      }
    }
    count = 0;
    setIsUpdate(false);
  }

  return (
    <main className={styles.main}>
      <section className={clsx(styles.inputSection, userName == "" ? styles.max : styles.min )}>
        <h1 className={styles.inputSectionTitle}>ActivityPubツリー</h1>
        <div className={styles.inputSectionForm}>
          <input className={styles.inputSectionFormText} type="text" value={String(userName)} onInput={handleInputText} />
          <button className={styles.inputSectionFormButton} onClick={() => {getData()}}>検索</button>
        </div>
      </section>

      {nowLoading && <div className={styles.loadingCircle}></div>}
      {(typeof window !== 'undefined' && userName != "" && !nowLoading) && (
        <Sketch setup={setup} draw={draw} />
      )}
    </main>
  )
}