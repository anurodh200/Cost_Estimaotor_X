def calculate_construction_cost(area, storeys, bhk_size):
    # Base construction rate per square foot (can be adjusted based on region)
    base_rate = 1500  # Example rate in currency units

    # Factors affecting construction cost
    storey_factor = 1.0 + (storeys - 1) * 0.1  # Each additional storey adds 10% to base cost

    # BHK factors (larger BHK sizes have higher quality finishes)
    bhk_factors = {
        1: 1.0,  # 1 BHK (base)
        2: 1.15,  # 2 BHK (15% premium)
        3: 1.25,  # 3 BHK (25% premium)
        4: 1.35,  # 4 BHK (35% premium)
        5: 1.5  # 5+ BHK (50% premium)
    }

    bhk_factor = bhk_factors.get(min(bhk_size, 5), 1.5)

    # Calculate total construction cost
    total_cost = base_rate * area * storey_factor * bhk_factor

    return round(total_cost, 2)
