import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Alert, TouchableOpacity, Modal, Button } from 'react-native';
import { doc, deleteDoc, updateDoc, collection, getDocs } from "@firebase/firestore"; // Changed from "firebase/firestore"
import { db } from '../firebase';

const UsersListScreen = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    // For editing
    const [editingUser, setEditingUser] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // Fetch users from Firestore
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(userData);
            } catch (error) {
                console.error("Error fetching users: ", error);
                Alert.alert("Error", "Could not fetch users.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const sortBy = (key) => {
        const sorted = [...users].sort((a, b) =>
            a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1
        );
        setUsers(sorted);
    };

    const handleDelete = async (id) => {
        Alert.alert(
            "Delete User",
            "Are you sure you want to delete this user?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, "users", id));
                            setUsers(users.filter(user => user.id !== id));
                            Alert.alert("Success", "User deleted successfully!");
                        } catch (err) {
                            console.error(err);
                            Alert.alert("Error", "Error deleting user");
                        }
                    },
                },
            ]
        );
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
    };

    const handleUpdate = async () => {
        try {
            const userRef = doc(db, "users", editingUser.id);
            await updateDoc(userRef, { name, email, phone });

            setUsers(users.map(u =>
                u.id === editingUser.id ? { ...u, name, email, phone } : u
            ));

            setEditingUser(null);
            Alert.alert("Success", "User updated successfully!");
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Error updating user");
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <View style={styles.userCard}>
            <View>
                <Text style={styles.userName}>Name: {item.name}</Text>
                <Text style={styles.userEmail}>Email: {item.email}</Text>
                <Text style={styles.userPhone}>Phone: {item.phone}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => handleEdit(item)}
                >
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(item.id)}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registered Users</Text>

            <TextInput
                style={styles.searchInput}
                placeholder="Search by name"
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            
            <View style={styles.sortContainer}>
                <Button title="Sort by Name" onPress={() => sortBy("name")} />
                <Button title="Sort by Email" onPress={() => sortBy("email")} />
            </View>

            <FlatList
                data={filteredUsers}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
            
            {/* Edit Modal */}
            <Modal
                visible={!!editingUser}
                animationType="slide"
                onRequestClose={() => setEditingUser(null)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Edit User</Text>
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Phone"
                        keyboardType="numeric"
                        maxLength={10}
                        value={phone}
                        onChangeText={setPhone}
                    />
                    <View style={styles.modalButtonContainer}>
                        <Button title="Update" onPress={handleUpdate} />
                        <Button title="Cancel" onPress={() => setEditingUser(null)} color="gray" />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    sortContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    userCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 14,
        color: '#6c757d',
    },
    userPhone: {
        fontSize: 14,
        color: '#6c757d',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginLeft: 10,
    },
    editButton: {
        backgroundColor: '#007bff',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(248, 249, 250, 0.95)',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    }
});

export default UsersListScreen;