'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './FloatingShards.module.css';

const SHARDS = [
  { id: 1, top: '20%', left: '10%', width: '120px', height: '180px', rotate: 15, delay: 0 },
  { id: 2, top: '60%', left: '85%', width: '160px', height: '240px', rotate: -10, delay: 1 },
  { id: 3, top: '10%', left: '70%', width: '100px', height: '150px', rotate: -25, delay: 0.5 },
  { id: 4, top: '75%', left: '15%', width: '200px', height: '120px', rotate: 5, delay: 1.5 },
];

export default function FloatingShards() {
  return (
    <div className={styles.container}>
      {SHARDS.map((shard) => (
        <motion.div
          key={shard.id}
          className={styles.shard}
          style={{
            top: shard.top,
            left: shard.left,
            width: shard.width,
            height: shard.height,
            rotate: shard.rotate,
          }}
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: shard.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
