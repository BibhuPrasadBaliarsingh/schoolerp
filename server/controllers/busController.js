import Bus from "../models/Bus.js";

// Get all buses
export const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get bus by ID
export const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ error: "Bus not found" });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create bus
export const createBus = async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.status(201).json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update bus
export const updateBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete bus
export const deleteBus = async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.json({ message: "Bus deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
