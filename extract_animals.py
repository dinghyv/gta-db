#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
提取 animals.json 中的所有动物类别
"""

import json
import os

def extract_animal_categories(json_file_path):
    """
    从 animals.json 文件中提取所有动物类别
    
    Args:
        json_file_path (str): animals.json 文件路径
        
    Returns:
        dict: 包含动物类别和统计信息的字典
    """
    try:
        # 读取 JSON 文件
        with open(json_file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        print(f"成功加载 {json_file_path}")
        print(f"文件大小: {os.path.getsize(json_file_path)} 字节")
        print("-" * 50)
        
        # 提取所有动物类别
        animal_categories = {}
        
        for animal_type, time_slots in data.items():
            print(f"\n动物类别: {animal_type}")
            
            if isinstance(time_slots, dict):
                total_positions = 0
                time_slot_info = {}
                
                for time_slot, positions in time_slots.items():
                    if isinstance(positions, list):
                        position_count = len(positions)
                        total_positions += position_count
                        time_slot_info[time_slot] = position_count
                        print(f"  时间段 {time_slot}: {position_count} 个位置")
                
                animal_categories[animal_type] = {
                    'total_positions': total_positions,
                    'time_slots': time_slot_info,
                    'time_slot_count': len(time_slot_info)
                }
                
                print(f"  总计: {total_positions} 个位置，{len(time_slot_info)} 个时间段")
            else:
                print(f"  警告: {animal_type} 的数据格式不是预期的字典格式")
                animal_categories[animal_type] = {
                    'total_positions': 0,
                    'time_slots': {},
                    'time_slot_count': 0,
                    'note': '数据格式异常'
                }
        
        return animal_categories
        
    except FileNotFoundError:
        print(f"错误: 找不到文件 {json_file_path}")
        return {}
    except json.JSONDecodeError as e:
        print(f"错误: JSON 解析失败 - {e}")
        return {}
    except Exception as e:
        print(f"错误: {e}")
        return {}

def print_summary(animal_categories):
    """
    打印动物类别统计摘要
    
    Args:
        animal_categories (dict): 动物类别信息
    """
    print("\n" + "=" * 60)
    print("动物类别统计摘要")
    print("=" * 60)
    
    if not animal_categories:
        print("未找到任何动物类别")
        return
    
    total_animals = len(animal_categories)
    total_positions = sum(info['total_positions'] for info in animal_categories.values())
    total_time_slots = sum(info['time_slot_count'] for info in animal_categories.values())
    
    print(f"动物类别总数: {total_animals}")
    print(f"位置总数: {total_positions}")
    print(f"时间段总数: {total_time_slots}")
    
    print("\n按位置数量排序:")
    sorted_animals = sorted(animal_categories.items(), 
                          key=lambda x: x[1]['total_positions'], 
                          reverse=True)
    
    for animal_type, info in sorted_animals:
        print(f"  {animal_type}: {info['total_positions']} 个位置 ({info['time_slot_count']} 个时间段)")

def save_results(animal_categories, output_file):
    """
    将结果保存到文件
    
    Args:
        animal_categories (dict): 动物类别信息
        output_file (str): 输出文件路径
    """
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(animal_categories, f, ensure_ascii=False, indent=2)
        print(f"\n结果已保存到: {output_file}")
    except Exception as e:
        print(f"保存文件失败: {e}")

def main():
    # 文件路径
    json_file = "src/data/animals.json"
    output_file = "animal_categories_summary.json"
    
    print("GTA 动物数据提取工具")
    print("=" * 40)
    
    # 检查文件是否存在
    if not os.path.exists(json_file):
        print(f"错误: 找不到文件 {json_file}")
        print("请确保在 gta-db 项目根目录下运行此脚本")
        return
    
    # 提取动物类别
    animal_categories = extract_animal_categories(json_file)
    
    if animal_categories:
        # 打印摘要
        print_summary(animal_categories)
        
        # 保存结果
        save_results(animal_categories, output_file)
        
        # 打印所有动物类别列表
        print(f"\n所有动物类别列表:")
        for i, animal_type in enumerate(animal_categories.keys(), 1):
            print(f"{i:2d}. {animal_type}")
    
    print("\n处理完成!")

if __name__ == "__main__":
    main()
