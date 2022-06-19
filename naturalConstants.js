// Value is given in SI units. Dimensions are in the following order:
// length, mass, time, temperature, charge
// (SI: m, kg, s, K, C)

const naturalConstants = {
    "Universal gravitation":    {value: 6.6743015e-11,      dim: [3, -1, -2, 0, 0]},
    "Planck constant":          {value: 6.62607015e-34,     dim: [2, 1, -1, 0, 0]},
    "Speed of light":           {value: 299792458,          dim: [1, 0, -1, 0, 0]},
    "Boltzmann constant":       {value: 1.380649e-23,       dim: [2, 1, -2, -1, 0]},
    "Elementary charge":        {value: 1.602176634e-19,    dim: [0, 0, 0, 0, 1]},

    "Standard atmosphere":      {value: 101325,             dim: [-1, 1, -2, 0, 0]},
    "Standard gravity":         {value: 9.80665,            dim: [1, 0, -2, 0, 0]}
};