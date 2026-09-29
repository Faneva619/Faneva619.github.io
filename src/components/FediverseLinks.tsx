"use client";

import React, { useState, useEffect } from "react";
import { Column, Row, Text, Heading, Button } from "@once-ui-system/core";

type TabType = "ia" | "physique";

const fediverseData = {
  ia: {
    title: "Data Science & Intelligence Artificielle",
    handle: "@faneva_rivotiana@infosec.exchange",
    url: "https://infosec.exchange/@faneva_rivotiana",
    description: "Veille technologique, algorithmes et modélisation prédictive.",
  },
  physique: {
    title: "Physique & Sciences Fondamentales",
    handle: "@faneva_rivotiana@social.sciences.re",
    url: "https://social.sciences.re/@faneva_rivotiana",
    description: "Modélisation, électromagnétisme et lois fondamentales.",
  },
};

export const FediverseLinks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("ia");
  const currentData = fediverseData[activeTab];

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.setAttribute(
        "data-science-mode",
        activeTab === "ia" ? "datascience" : "physique"
      );
    }
  }, [activeTab]);

  return (
    <Column
      fillWidth
      gap="32"
      padding="40"
      horizontal="center"
      style={{ position: "relative", zIndex: 1 }}
    >
      <Heading variant="display-strong-m" align="center">
        Retrouvez-moi sur le Fediverse
      </Heading>

      <Row
        gap="4"
        padding="4"
        background="page"
        border="neutral-alpha-medium"
        radius="m"
      >
        <Button
          variant={activeTab === "ia" ? "primary" : "secondary"}
          size="m"
          onClick={() => setActiveTab("ia")}
        >
          Data Science & IA
        </Button>
        <Button
          variant={activeTab === "physique" ? "primary" : "secondary"}
          size="m"
          onClick={() => setActiveTab("physique")}
        >
          Physique
        </Button>
      </Row>

      <Column gap="16" horizontal="center" style={{ textAlign: "center" }}>
        <Text variant="body-default-l" onBackground="neutral-medium">
          {currentData.description}
        </Text>
        <Text
          variant="body-strong-m"
          onBackground="brand-strong"
          style={{ fontFamily: "var(--font-code)" }}
        >
          {currentData.handle}
        </Text>
        <Button
          href={currentData.url}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="l"
          arrowIcon
        >
          Voir le profil
        </Button>
      </Column>

      <Row gap="12" vertical="center" horizontal="center" paddingTop="24">
        <Text variant="label-default-s" onBackground="neutral-weak">
          Les QR codes flottent dans l'espace — approchez votre curseur pour les révéler, cliquez pour suivre.
        </Text>
      </Row>
    </Column>
  );
};
