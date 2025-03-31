import React, { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";
import { Link } from "react-router-dom";

interface ProfileData {
    name: string;
    email: string;
}

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<ProfileData>({
        name: "",
        email: "",
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    navigate("/login");
                    return;
                }
                const response = await getUserProfile(userId);
                setProfile(response.data);
            } catch (error) {
                setError("Failed to load profile. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        navigate("/login");
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const userId = localStorage.getItem("userId");
            if (!userId) {
                navigate("/login");
                return;
            }
            await updateUserProfile(userId, profile.name, profile.email);
            setIsEditing(false);
        } catch (error) {
            setError("Failed to update profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p className="loading">Loading profile...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="profile-container">
            <div>
                <div style={{textAlign: 'center', margin: '10px'}}>
                    <Link to={'/postApp'}>Click here</Link> to add post
                </div>
                <div className="profile-card">
                    <h2>User Profile</h2>
                    <div className="profile-details">
                        <label>
                            <strong>Name:</strong>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleInputChange}
                                    disabled={saving}
                                />
                            ) : (
                                <span>{profile.name}</span>
                            )}
                        </label>

                        <label>
                            <strong>Email:</strong>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleInputChange}
                                    disabled={saving}
                                />
                            ) : (
                                <span>{profile.email}</span>
                            )}
                        </label>
                    </div>

                    <div className="profile-actions">
                        {isEditing ? (
                            <button
                                className="save-btn"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        ) : (
                            <button className="edit-btn" onClick={handleEditToggle}>
                                Edit Profile
                            </button>
                        )}
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;