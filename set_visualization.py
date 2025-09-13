import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Circle
import matplotlib.patches as patches
import matplotlib
matplotlib.use('Agg')  # Используем backend без GUI

# Настройка графиков
plt.style.use('default')
fig, axes = plt.subplots(2, 3, figsize=(18, 12))
fig.suptitle('Визуализация множеств и их операций', fontsize=16, fontweight='bold')

# Параметры
x_range = np.linspace(-1, 8, 400)
y_range = np.linspace(-1, 8, 400)
X, Y = np.meshgrid(x_range, y_range)

# Определение множеств
# A: окружность с центром (3,3) и радиусом 3
A = (X - 3)**2 + (Y - 3)**2 <= 9

# B: область y <= x
B = Y <= X

# Дополнения
A_complement = ~A
B_complement = ~B

# Операции над множествами
A_union_B = A | B
A_intersect_B = A & B
A_minus_B = A & ~B
B_minus_A = B & ~A

# Функция для построения графика
def plot_set(ax, condition, title, color='blue', alpha=0.3):
    ax.contourf(X, Y, condition.astype(int), levels=[0.5, 1.5], colors=[color], alpha=alpha)
    ax.contour(X, Y, condition.astype(int), levels=[0.5], colors=[color], linewidths=2)
    
    # Добавляем окружность A
    circle = Circle((3, 3), 3, fill=False, edgecolor='red', linewidth=2, linestyle='--')
    ax.add_patch(circle)
    
    # Добавляем линию y = x
    x_line = np.linspace(-1, 8, 100)
    ax.plot(x_line, x_line, 'g--', linewidth=2, label='y = x')
    
    ax.set_xlim(-1, 8)
    ax.set_ylim(-1, 8)
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.set_title(title, fontweight='bold')
    ax.grid(True, alpha=0.3)
    ax.set_aspect('equal')

# 1. A ∪ B (объединение)
plot_set(axes[0, 0], A_union_B, '1. A ∪ B\n(объединение)', 'purple', 0.4)

# 2. A ∩ B (пересечение)
plot_set(axes[0, 1], A_intersect_B, '2. A ∩ B\n(пересечение)', 'orange', 0.6)

# 3. A \ B (разность A без B)
plot_set(axes[0, 2], A_minus_B, '3. A \\ B\n(A без B)', 'red', 0.5)

# 4. B \ A (разность B без A)
plot_set(axes[1, 0], B_minus_A, '4. B \\ A\n(B без A)', 'green', 0.5)

# 5. A' (дополнение A)
plot_set(axes[1, 1], A_complement, '5. A\'\n(дополнение A)', 'cyan', 0.3)

# 6. B' (дополнение B)
plot_set(axes[1, 2], B_complement, '6. B\'\n(дополнение B)', 'yellow', 0.3)

# Добавляем легенду для первого графика
axes[0, 0].legend(['y = x', 'Граница A'], loc='upper left')

# Добавляем текстовые аннотации
for i in range(2):
    for j in range(3):
        axes[i, j].text(0.02, 0.98, f'A: (x-3)² + (y-3)² ≤ 9\nB: y ≤ x', 
                       transform=axes[i, j].transAxes, fontsize=8,
                       verticalalignment='top', bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))

plt.tight_layout()
plt.savefig('/workspace/set_operations.png', dpi=300, bbox_inches='tight')
plt.close()

# Создаем отдельный график для лучшей визуализации пересечений
fig2, ax = plt.subplots(1, 1, figsize=(10, 10))

# Создаем более детальную визуализацию с разными цветами для каждой области
only_A = A & ~B  # Только A
only_B = B & ~A  # Только B
both_AB = A & B  # Пересечение A и B
neither = ~A & ~B  # Ни A, ни B

# Раскрашиваем разные области
ax.contourf(X, Y, only_A.astype(int), levels=[0.5, 1.5], colors=['lightcoral'], alpha=0.7, label='Только A')
ax.contourf(X, Y, only_B.astype(int), levels=[0.5, 1.5], colors=['lightgreen'], alpha=0.7, label='Только B')
ax.contourf(X, Y, both_AB.astype(int), levels=[0.5, 1.5], colors=['gold'], alpha=0.9, label='A ∩ B')

# Границы
circle = Circle((3, 3), 3, fill=False, edgecolor='red', linewidth=3)
ax.add_patch(circle)
x_line = np.linspace(-1, 8, 100)
ax.plot(x_line, x_line, 'blue', linewidth=3, label='y = x')

ax.set_xlim(-1, 8)
ax.set_ylim(-1, 8)
ax.set_xlabel('x', fontsize=12)
ax.set_ylabel('y', fontsize=12)
ax.set_title('Детальная визуализация множеств A и B с выделенными пересечениями', fontsize=14, fontweight='bold')
ax.grid(True, alpha=0.3)
ax.set_aspect('equal')

# Легенда
ax.legend(['y = x (граница B)', 'Только A', 'Только B', 'A ∩ B (пересечение)'], loc='upper left')

# Добавляем подписи областей
ax.text(1.5, 5, 'Только A', fontsize=12, fontweight='bold', ha='center')
ax.text(5, 1.5, 'Только B', fontsize=12, fontweight='bold', ha='center')
ax.text(3, 2.5, 'A ∩ B', fontsize=12, fontweight='bold', ha='center', 
        bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))

plt.tight_layout()
plt.savefig('/workspace/detailed_intersection.png', dpi=300, bbox_inches='tight')
plt.close()

print("Графики сохранены как:")
print("1. set_operations.png - все операции над множествами")
print("2. detailed_intersection.png - детальная визуализация пересечений")