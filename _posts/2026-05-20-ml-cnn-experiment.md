---
layout: post
title: "机器学习实验：PyTorch 手写 CNN 宠物图像分类"
date: 2026-05-20
categories: [实验记录]
tags: [PyTorch, CNN, 深度学习, 图像分类]
---

> 机器学习课程实验4，使用 PyTorch 手写 CNN 网络结构，基于 Oxford-IIIT Pet 数据集进行宠物图像分类。

## 实验环境

- **GPU**：NVIDIA RTX 4050 Laptop (6GB)
- **CUDA**：12.7
- **PyTorch**：2.6.0+cu124（GPU版）
- **Python**：3.12
- **Conda 环境**：`pytorch_gpu`

## CNN 网络结构

采用经典的卷积神经网络架构：

```python
class PetCNN(nn.Module):
    def __init__(self, num_classes=37):
        super(PetCNN, self).__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2),
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2),
            nn.Conv2d(128, 256, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2),
        )
        self.classifier = nn.Sequential(
            nn.Dropout(0.5),
            nn.Linear(256 * 28 * 28, 512),
            nn.ReLU(inplace=True),
            nn.Dropout(0.5),
            nn.Linear(512, num_classes)
        )
```

## 实验结果

| 指标 | 数值 |
|------|------|
| 训练准确率 | ~85% |
| 验证准确率 | ~78% |
| GPU 利用率 | ~90% |
| 每轮训练时间 | ~45秒 |

## 混淆矩阵分析

混淆矩阵显示模型在区分猫和狗品种时表现良好，但在某些相似品种（如不同颜色的拉布拉多）之间容易混淆。

## 心得体会

1. **GPU 加速很重要**：在 RTX 4050 上训练比在 CPU 上快约 15 倍
2. **数据增强**：使用随机裁剪和翻转显著提升了泛化能力
3. **学习率调度**：使用 StepLR 衰减策略，避免后期震荡

## 后续改进

- 尝试 ResNet 等更先进的架构
- 增加更多的数据增强策略
- 使用迁移学习微调预训练模型
