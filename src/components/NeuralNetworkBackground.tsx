"use client";

import React, { useEffect, useRef, useState } from "react";
import { generateCustomQR, ICONS } from "@/utils/CustomQREngine";

const QR_NODES = [
  { id: "ia", url: "https://infosec.exchange/@faneva_rivotiana", label: "IA", primaryColor: "#1e3a8a", secondaryColor: "#67e8f9", icon: ICONS.ia, dotShape: "circle" as const, cornerShape: "concentric" as const },
  { id: "physique", url: "https://social.sciences.re/@faneva_rivotiana", label: "Physique", primaryColor: "#06b6d4", secondaryColor: "#f0f9ff", icon: ICONS.physique, dotShape: "rounded-square" as const, cornerShape: "circle" as const },
  { id: "bluesky", url: "https://bsky.app/profile/rivo.int.yt", label: "Bluesky", primaryColor: "#0085ff", secondaryColor: "#bae6fd", icon: ICONS.bluesky, dotShape: "diamond" as const, cornerShape: "rounded-square" as const },
  { id: "mastodon", url: "https://mastodon.social/@faneva_rivotiana", label: "Mastodon", primaryColor: "#6366f1", secondaryColor: "#c7d2fe", icon: ICONS.mastodon, dotShape: "circle" as const, cornerShape: "rounded-square" as const },
  { id: "ia-2", url: "https://infosec.exchange/@faneva_rivotiana", label: "IA", primaryColor: "#1e3a8a", secondaryColor: "#3b82f6", icon: ICONS.ia, dotShape: "square" as const, cornerShape: "square" as const },
  { id: "physique-2", url: "https://social.sciences.re/@faneva_rivotiana", label: "Physique", primaryColor: "#06b6d4", secondaryColor: "#22d3ee", icon: ICONS.physique, dotShape: "circle" as const, cornerShape: "concentric" as const },
  { id: "bluesky-2", url: "https://bsky.app/profile/rivo.int.yt", label: "Bluesky", primaryColor: "#0085ff", secondaryColor: "#38bdf8", icon: ICONS.bluesky, dotShape: "rounded-square" as const, cornerShape: "circle" as const },
  { id: "mastodon-2", url: "https://mastodon.social/@faneva_rivotiana", label: "Mastodon", primaryColor: "#6366f1", secondaryColor: "#818cf8", icon: ICONS.mastodon, dotShape: "diamond" as const, cornerShape: "concentric" as const },
];

export const NeuralNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<"datascience" | "physique">("datascience");
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const qrCanvasesRef = useRef<Map<string, HTMLCanvasElement>>(new Map());
  const [hoveredQR, setHoveredQR] = useState<string | null>(null);

  useEffect(() => {
    const generateAll = async () => {
      for (const qr of QR_NODES) {
        const canvas = await generateCustomQR(qr.url, {
          primaryColor: qr.primaryColor,
          secondaryColor: qr.secondaryColor,
          bgColor: "#050505",
          dotShape: qr.dotShape,
          cornerShape: qr.cornerShape,
          iconSvg: qr.icon,
          iconColor: qr.primaryColor,
          size: 200,
        });
        qrCanvasesRef.current.set(qr.id, canvas);
      }
    };
    generateAll();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; chaos: number; }[] = [];
    let qrNodes: { id: string; x: number; y: number; vx: number; vy: number; size: number; chaos: number; phase: number; url: string; primaryColor: string; isStopped: boolean; }[] = [];

    let currentSpeed = 0.4;
    let currentConnectionDist = 200;
    let currentR = 30, currentG = 58, currentB = 138;
    const config = { particleCount: 80, lerpFactor: 0.05 };

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
      initQRNodes();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < config.particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 2 + 2.5,
          chaos: Math.random() * 0.08 + 0.02,
        });
      }
    };

    const initQRNodes = () => {
      qrNodes = [];
      const cols = 4;
      const rows = 2;
      const cellW = canvas.width / cols;
      const cellH = canvas.height / rows;

      QR_NODES.forEach((qr, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const jitterX = cellW * 0.7;
        const jitterY = cellH * 0.7;
        const x = col * cellW + cellW * 0.15 + Math.random() * jitterX;
        const y = row * cellH + cellH * 0.15 + Math.random() * jitterY;

        qrNodes.push({
          id: qr.id,
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: 30,
          chaos: Math.random() * 0.05 + 0.02,
          phase: Math.random() * Math.PI * 2,
          url: qr.url,
          primaryColor: qr.primaryColor,
          isStopped: false,
        });
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleClick = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      qrNodes.forEach((qr) => {
        const dx = mouse.x - qr.x;
        const dy = mouse.y - qr.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < qr.size) {
          window.open(qr.url, "_blank", "noopener,noreferrer");
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const draw = () => {
      if (!canvas || !ctx) return;

      const domMode = typeof document !== "undefined" ? document.body.getAttribute("data-science-mode") : null;
      if (domMode === "datascience" || domMode === "physique") modeRef.current = domMode;

      const mode = modeRef.current;
      const mouse = mouseRef.current;
      const time = Date.now() * 0.001;

      const targetSpeed = mode === "physique" ? 1.8 : 0.4;
      const targetConnectionDist = mode === "physique" ? 160 : 200;
      const targetR = mode === "physique" ? 6 : 30;
      const targetG = mode === "physique" ? 182 : 58;
      const targetB = mode === "physique" ? 212 : 138;

      currentSpeed += (targetSpeed - currentSpeed) * config.lerpFactor;
      currentConnectionDist += (targetConnectionDist - currentConnectionDist) * config.lerpFactor;
      currentR += (targetR - currentR) * config.lerpFactor;
      currentG += (targetG - currentG) * config.lerpFactor;
      currentB += (targetB - currentB) * config.lerpFactor;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const r = Math.round(currentR), g = Math.round(currentG), b = Math.round(currentB);

      // 1. Particules
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (mode === "datascience") {
          p.x += p.vx * 0.6 + 0.5;
          p.y += p.vy * 0.3 + Math.sin(time + i) * 0.3;
          if (p.x > canvas.width) p.x = 0;
          if (p.x < 0) p.x = canvas.width;
          if (p.y > canvas.height || p.y < 0) p.vy *= -1;
        } else {
          p.vx += (Math.random() - 0.5) * p.chaos * 2;
          p.vy += (Math.random() - 0.5) * p.chaos * 2;
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > currentSpeed) {
            p.vx = (p.vx / speed) * currentSpeed;
            p.vy = (p.vy / speed) * currentSpeed;
          }
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) {
            p.vx *= -1;
            p.x = p.x < 0 ? 0 : canvas.width;
          }
          if (p.y < 0 || p.y > canvas.height) {
            p.vy *= -1;
            p.y = p.y < 0 ? 0 : canvas.height;
          }
        }

        const dxMouse = mouse.x - p.x, dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 200 && distMouse > 0) {
          const force = (200 - distMouse) / 200;
          p.x += (dxMouse / distMouse) * force * 1.5;
          p.y += (dyMouse / distMouse) * force * 1.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
        ctx.fill();
      }

      // 2. QR Nodes avec ARRÊT COMPLET et Scan Mobile Optimisé
      let newHoveredQR: string | null = null;

      qrNodes.forEach((qr) => {
        const dxMouse = mouse.x - qr.x;
        const dyMouse = mouse.y - qr.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        // ARRÊT COMPLET si la souris est proche (< 300px)
        if (distMouse < 300) {
          qr.isStopped = true;
          qr.vx *= 0.85;
          qr.vy *= 0.85;
        } else {
          qr.isStopped = false;
          qr.vx += (Math.random() - 0.5) * qr.chaos * 2;
          qr.vy += (Math.random() - 0.5) * qr.chaos * 2;

          const qrSpeed = Math.sqrt(qr.vx * qr.vx + qr.vy * qr.vy);
          const maxQRSpeed = 1.2;
          if (qrSpeed > maxQRSpeed) {
            qr.vx = (qr.vx / qrSpeed) * maxQRSpeed;
            qr.vy = (qr.vy / qrSpeed) * maxQRSpeed;
          }
        }

        // Mise à jour position
        if (Math.abs(qr.vx) > 0.01 || Math.abs(qr.vy) > 0.01) {
          qr.x += qr.vx;
          qr.y += qr.vy;
        }

        // Rebond bords
        if (qr.x < 70 || qr.x > canvas.width - 70) {
          qr.vx *= -1;
          qr.x = Math.max(70, Math.min(canvas.width - 70, qr.x));
        }
        if (qr.y < 70 || qr.y > canvas.height - 70) {
          qr.vy *= -1;
          qr.y = Math.max(70, Math.min(canvas.height - 70, qr.y));
        }

        // Taille variable (Max 180px pour le scan mobile)
        const minSize = 3;
        const maxSize = 180;
        let targetSize = minSize;

        if (distMouse < 350) {
          const factor = 1 - distMouse / 350;
          targetSize = minSize + (maxSize - minSize) * Math.pow(factor, 1.5);
          newHoveredQR = qr.id;
        }

        qr.size += (targetSize - qr.size) * 0.08;

        // Battement de cœur : 1.0 (stable) si arrêté, sinon légère pulsation
        const heartbeat = qr.isStopped ? 1.0 : 1 + Math.sin(time * 0.5 + qr.phase) * 0.08;
        const finalSize = qr.size * heartbeat;

        const qrCanvas = qrCanvasesRef.current.get(qr.id);
        if (qrCanvas && finalSize > 8) {
          ctx.save();
          ctx.translate(qr.x, qr.y);

          // ZÉRO MOTION quand arrêté
          const rotation = qr.isStopped ? 0 : Math.sin(time * 0.3 + qr.phase) * 0.15;
          ctx.rotate(rotation);

          // OPACITÉ 100% quand il est assez grand
          const opacity = finalSize > 50 ? 1.0 : Math.min(1, finalSize / 30);
          ctx.globalAlpha = opacity;

          // FOND SOLIDE pour bloquer les lignes du réseau
          if (finalSize > 40) {
            const boxSize = finalSize + 24;
            ctx.fillStyle = "#050505";
            ctx.beginPath();
            if (ctx.roundRect) {
              ctx.roundRect(-boxSize / 2, -boxSize / 2, boxSize, boxSize, 16);
            } else {
              ctx.rect(-boxSize / 2, -boxSize / 2, boxSize, boxSize);
            }
            ctx.fill();

            // Bordure colorée
            ctx.strokeStyle = qr.primaryColor;
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          // Dessiner le QR
          ctx.drawImage(qrCanvas, -finalSize / 2, -finalSize / 2, finalSize, finalSize);
          ctx.restore();
        }
      });

      setHoveredQR(newHoveredQR);

      // 3. Connexions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x, dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < currentConnectionDist) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.6 * (1 - distance / currentConnectionDist)})`;
            ctx.lineWidth = mode === "physique" ? 1.2 : 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        qrNodes.forEach((qr) => {
          const dx = p.x - qr.x, dy = p.y - qr.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < currentConnectionDist * 1.5) {
            ctx.beginPath();
            ctx.strokeStyle = qr.primaryColor;
            ctx.globalAlpha = 0.5 * (1 - distance / (currentConnectionDist * 1.5));
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(qr.x, qr.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
      particles = [];
      qrNodes = [];
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "auto",
        opacity: 0.9,
        cursor: hoveredQR ? "pointer" : "default",
      }}
    />
  );
};
