#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
简洁地列出 animals.json 中的所有动物类别
"""

import json

def list_animal_categories():
    """列出所有动物类别"""
    try:
        with open("src/data/animals.json", 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        print("animals.json 中的所有动物类别:")
        print("=" * 50)
        
        # 按字母顺序排序
        animal_types = sorted(data.keys())
        
        for i, animal_type in enumerate(animal_types, 1):
            # 计算总位置数
            total_positions = 0
            time_slots = 0
            
            if isinstance(data[animal_type], dict):
                for time_slot, positions in data[animal_type].items():
                    if isinstance(positions, list):
                        total_positions += len(positions)
                        time_slots += 1
            
            print(f"{i:2d}. {animal_type:<20} ({total_positions:4d} 个位置, {time_slots:2d} 个时间段)")
        
        print(f"\n总计: {len(animal_types)} 种动物")
        
        # 按位置数量排序的前10名
        print("\n按位置数量排序 (前10名):")
        print("-" * 40)
        
        animal_counts = []
        for animal_type in data.keys():
            total_positions = 0
            if isinstance(data[animal_type], dict):
                for positions in data[animal_type].values():
                    if isinstance(positions, list):
                        total_positions += len(positions)
            animal_counts.append((animal_type, total_positions))
        
        # 按位置数量降序排序
        animal_counts.sort(key=lambda x: x[1], reverse=True)
        
        for i, (animal_type, count) in enumerate(animal_counts[:10], 1):
            print(f"{i:2d}. {animal_type:<20} {count:4d} 个位置")
            
    except Exception as e:
        print(f"错误: {e}")

if __name__ == "__main__":
    list_animal_categories()
