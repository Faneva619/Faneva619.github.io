"use client";

import React, { useEffect, useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface FloatingQRCodeProps {
  url: string;
  label: string;
  color: string;
  initialX: number;
  initialY: number;
}

export const FloatingQRCode: React.FC<FloatingQRCodeProps> = ({
  url,
  label,
  color,
  initialX,
  initialY,
}) => {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [velocity, setVelocity] = useState({
    vx: (Math.random() - 0.5) * 1.2,
    vy: (Math.random() - 0.5) * 1.2,
  });
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const qrElementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Mouvement de flottement continu
  useEffect(() => {
    const animate = () => {
      setPos((prevPos) => {
        let newX = prevPos.x + velocity.vx;
        let newY = prevPos.y + velocity.vy;
        let newVx = velocity.vx;
        let newVy = velocity.vy;

        // Rebond sur les bords
        if (newX <= 5 || newX >= 95) {
          newVx = -velocity.vx;
          newX = newX <= 5 ? 5 : 95;
        }
        if (newY <= 5 || newY >= 90) {
          newVy = -velocity.vy;
          newY = newY <= 5 ? 5 : 90;
        }

        setVelocity({ vx: newVx, vy: newVy });
        return { x: newX, y: newY };
      });

      // Rotation imprévisible
      setRotation((prev) => prev + (Math.random() - 0.5) * 2);

      // Zoom "battement de coeur" aléatoire
      const heartbeat = 1 + Math.sin(Date.now() * 0.003) * 0.05 + Math.random() * 0.1;
      setScale(heartbeat);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [velocity]);

  // Track souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Détection survol et arrêt du mouvement
  useEffect(() => {
    if (!qrElementRef.current) return;

    const checkHover = () => {
      const rect = qrElementRef.current?.getBoundingClientRect();
      if (!rect) return;

      const qrCenterX = rect.left + rect.width / 2;
      const qrCenterY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(mousePos.x - qrCenterX, 2) +
        Math.pow(mousePos.y - qrCenterY, 2)
      );

      if (distance < 150) {
        setIsHovered(true);
        // Arrêter le mouvement quand la souris est proche
        setVelocity({ vx: 0, vy: 0 });
      } else {
        setIsHovered(false);
        // Reprendre le mouvement lentement
        setVelocity({
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
        });
      }
    };

    const interval = setInterval(checkHover, 100);
    return () => clearInterval(interval);
  }, [mousePos]);

  return (
    <div
      ref={qrElementRef}
      style={{
        position: "fixed",
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        zIndex: 10,
        pointerEvents: "auto",
        cursor: "pointer",
        transition: isHovered ? "transform 0.3s ease" : "none",
        transform: `scale(${isHovered ? 1.5 : scale}) rotate(${rotation}deg)`,
      }}
      onClick={() => window.open(url, "_blank")}
    >
      <div
        style={{
          padding: "12px",
          background: "rgba(10, 10, 10, 0.95)",
          borderRadius: "12px",
          border: `2px solid ${color}`,
          boxShadow: isHovered
            ? `0 0 40px ${color}, 0 0 80px ${color}60`
            : `0 0 20px ${color}60`,
          backdropFilter: "blur(10px)",
          opacity: isHovered ? 1 : 0.85,
        }}
      >
        <QRCodeCanvas
          value={url}
          size={isHovered ? 100 : 70}
          level="H"
          fgColor={color}
          bgColor="#0a0a0a"
          marginSize={0}
        />
      </div>
      {isHovered && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: "12px",
            padding: "8px 16px",
            background: "rgba(10, 10, 10, 0.95)",
            color: color,
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            border: `1px solid ${color}`,
            boxShadow: `0 0 20px ${color}40`,
          }}
        >
          {label} - Cliquez pour suivre
        </div>
      )}
    </div>
  );
};
